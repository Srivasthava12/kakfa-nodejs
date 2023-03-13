import { AppError } from "@lib/error-handling";
import ajv from "@lib/validation";
import { ValidateFunction } from 'ajv';
import { templateSchema, addTemplate, schemaKeys } from './template-schema'

export function assertNewTemplate(newTemplate: addTemplate): boolean {
    const { NEW_TEMPLATE } = schemaKeys;
    let validationSchema!: ValidateFunction<addTemplate> | undefined;
    validationSchema = ajv.getSchema<addTemplate>(NEW_TEMPLATE);
    if (!validationSchema) {
        ajv.addSchema(templateSchema, NEW_TEMPLATE)
        validationSchema = ajv.getSchema<addTemplate>(NEW_TEMPLATE);
    }

    if (validationSchema === undefined) {
        throw new AppError(
            'validation-failure',
            'An internal validation error occured where schemas cant be obtained',
            500,
            false
        );
    }
    const isValid = validationSchema(newTemplate)
    if (!isValid) {
        throw new AppError('invalid-template', `Validation failed`, 400, true);
    }
    return isValid
}
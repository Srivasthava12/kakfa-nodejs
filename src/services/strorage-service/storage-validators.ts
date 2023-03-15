import { AppError } from "@lib/error-handling";
import ajv from "@lib/validation";
import { ValidateFunction } from 'ajv';
import { storageSchema, storeTemplate, schemaKeys } from './storage-schema'

export function assertTemplate2Store(template: storeTemplate): boolean {
    const { STORE_TEMPLATE } = schemaKeys;
    let validationSchema!: ValidateFunction<storeTemplate> | undefined;
    validationSchema = ajv.getSchema<storeTemplate>(STORE_TEMPLATE);
    if (!validationSchema) {
        ajv.addSchema(storageSchema, STORE_TEMPLATE)
        validationSchema = ajv.getSchema<storeTemplate>(STORE_TEMPLATE);
    }

    if (validationSchema === undefined) {
        throw new AppError(
            'validation-failure',
            'An internal validation error occured where schemas cant be obtained',
            500,
            false
        );
    }
    const isValid = validationSchema(template)
    if (!isValid) {
        throw new AppError('invalid-template-2-store', `Validation failed`, 400, true);
    }
    return isValid
}
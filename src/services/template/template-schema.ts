import { Static, Type } from '@sinclair/typebox';

export const templateSchema = Type.Object({
    fileB64: Type.String({ format: 'base64' })
})

export type addTemplate = Static<typeof templateSchema>;


export const schemaKeys = {
    NEW_TEMPLATE: 'new-template'
}

export type TemplateId = {
    templateId: string;
}
import { Static, Type } from '@sinclair/typebox';

export const storageSchema = Type.Object({
    fileB64: Type.String(),
    templateId: Type.String()
})

export type storeTemplate = Static<typeof storageSchema>;

export const schemaKeys = {
    STORE_TEMPLATE: 'store-template'
}

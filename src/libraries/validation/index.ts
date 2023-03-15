import AJV from 'ajv';

// This file is used to provide a 'singleton' AJV instance for the entire app so
// every client can cache the compiled schemas

const ajv = new AJV();


ajv.addFormat('base64', {
  type: 'string',
  validate: function (data) {
    const regex = /^[a-zA-Z0-9+/]*={0,2}$/;
    return regex.test(data);
  },
});

export default ajv
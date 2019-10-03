const yup = require("yup");

class BaseModel {
  constructor() {
    this.validationSchema = null;
  }

  getFieldValidator(field) {
    const self = this;
    return {
      validator: async function(/* value */) {
        if (!self.validationSchema) return true;

        try {
          yup.reach(self.validationSchema, field);
        } catch (error) {
          return true; // unkown field
        }

        try {
          await self.validationSchema.validateAt(
            field,
            this.toObject({ getters: true, virtuals: true })
          );
        } catch (error) {
          throw error.errors.length === 1 ? error.errors[0] : error.errors;
        }

        return true;
      }
    };
  }

  getValidateMethod() {
    const self = this;
    return async function(field, value) {
      const { validator } = self.getFieldValidator(field);
      try {
        await validator.bind(this)(value);
      } catch (error) {
        throw this.di.get("error.validation", {
          errors: { password: { message: error } }
        });
      }
    };
  }

  cast(values) {
    if (!this.validationSchema) return {};
    const castValues = this.validationSchema.cast(values);
    const result = {};
    for (let field of _.keys(castValues)) {
      try {
        yup.reach(this.validationSchema, field);
        result[field] = castValues[field];
      } catch (error) {
        // do nothing
      }
    }
    return result;
  }

  async init() {}
}

module.exports = BaseModel;

const { body, validationResult } = require("express-validator");
const notify = require("../config/notify");
const util = require("util");

const options = {
  name: { min: 2, max: 100 },
  description: { min: 2, max: 100 },
  status: { active: "active", inactive: "inactive" },
  ordering: { min: 1 },
};

const validationRules = {
  name: body("name")
    .isLength({ min: options.name.min, max: options.name.max })
    .withMessage(util.format(notify.name, options.name.min, options.name.max)),
  description: body("description")
    .isLength({
      min: options.description.min,
      max: options.description.max,
    })
    .withMessage(
      util.format(
        notify.description,
        options.description.min,
        options.description.max
      )
    ),
  status: body("status").custom((value) => {
    if (
      value !== options.status.active &&
      value !== options.status.inactive
    ) {
      throw new Error(
        util.format(
          notify.status,
          options.status.active,
          options.status.inactive
        )
      );
    }
    return true;
  }),
  ordering: body("ordering")
    .isInt({ min: options.ordering.min })
    .withMessage(
      util.format(notify.ordering, options.ordering.min)
    ),
};

const handleValidate = (listField) => {
  // Combine individual validation rules into a single chain
  return listField.map((field) => validationRules[field]);
};

module.exports = {
  handleValidate,
};

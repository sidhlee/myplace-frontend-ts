enum ValidatorType {
  REQUIRE,
  MINLENGTH,
  MAXLENGTH,
  MIN,
  MAX,
  EMAIL,
  FILE,
}

type ValidatorRequire = {
  type: ValidatorType.REQUIRE
}
type ValidatorMinLength = {
  type: ValidatorType.MINLENGTH
  val: number
}
type ValidatorMaxLength = {
  type: ValidatorType.MAXLENGTH
  val: number
}
type ValidatorMin = {
  type: ValidatorType.MIN
  val: number
}
type ValidatorMax = {
  type: ValidatorType.MAX
  val: number
}
type ValidatorEmail = {
  type: ValidatorType.EMAIL
}
type ValidatorFile = {
  type: ValidatorType.FILE
}

export type Validator =
  | ValidatorRequire
  | ValidatorMinLength
  | ValidatorMaxLength
  | ValidatorMin
  | ValidatorMax
  | ValidatorEmail
  | ValidatorFile

export const VALIDATOR_REQUIRE = (): ValidatorRequire => ({
  type: ValidatorType.REQUIRE,
})

export const VALIDATOR_MINLENGTH = (val: number): ValidatorMinLength => ({
  type: ValidatorType.MINLENGTH,
  val,
})

export const VALIDATOR_MAXLENGTH = (val: number): ValidatorMaxLength => ({
  type: ValidatorType.MAXLENGTH,
  val,
})

export const VALIDATOR_MIN = (val: number): ValidatorMin => ({
  type: ValidatorType.MIN,
  val,
})

export const VALIDATOR_MAX = (val: number): ValidatorMax => ({
  type: ValidatorType.MAX,
  val,
})

export const VALIDATOR_EMAIL = (): ValidatorEmail => ({
  type: ValidatorType.EMAIL,
})

export const validate = (
  value: string | number,
  validators: Validator[]
): boolean => {
  let isValid = true
  for (const validator of validators) {
    if (validator.type === ValidatorType.REQUIRE) {
      isValid = isValid && value.toString().trim().length > 0
    }
    if (validator.type === ValidatorType.MINLENGTH) {
      isValid = isValid && value.toString().trim().length >= validator.val
    }
    if (validator.type === ValidatorType.MAXLENGTH) {
      isValid = isValid && value.toString().trim().length <= validator.val
    }
    if (validator.type === ValidatorType.MIN) {
      isValid = isValid && value >= validator.val
    }
    if (validator.type === ValidatorType.EMAIL) {
      if (typeof value === 'string') {
        isValid =
          isValid &&
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
      }
    }
  }
  return isValid
}

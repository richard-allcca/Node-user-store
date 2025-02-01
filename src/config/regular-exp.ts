

/**
 * An object containing regular expressions for validating various input formats.
 * 
 * @property {RegExp} email - Regular expression to validate email addresses.
 *   - Matches a string that follows the pattern of a typical email address.
 *   - Example: `example@example.com`
 * 
 * @property {RegExp} password - Regular expression to validate passwords.
 *   - Requires at least one letter and one number.
 *   - Must be at least 8 characters long.
 *   - Example: `Password1`
 * 
 * @property {RegExp} name - Regular expression to validate names.
 *   - Matches a string that contains only letters and is at least 2 characters long.
 *   - Example: `John`
 */
export const regularExp = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  name: /^[a-zA-Z]{2,}$/,
}
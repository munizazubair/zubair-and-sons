/**
 * Mock Auth and Password verification services.
 * These helpers perform client-side mock validations and emulate standard
 * server responses. In a production environment, these should communicate
 * with Firebase Auth or your backend endpoints securely.
 */

export interface PasswordChangeResult {
  success: boolean;
  message: string;
}

/**
 * Mock function to validate and execute password change.
 * Demands current password = 'owner123' (mock default owner password)
 * and requires minimum 6 characters for the new password.
 */
export async function changePasswordMock(
  currentPass: string,
  newPass: string,
  confirmPass: string
): Promise<PasswordChangeResult> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!currentPass || !newPass || !confirmPass) {
    return { success: false, message: 'All password fields are required.' };
  }

  if (newPass.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }

  if (newPass !== confirmPass) {
    return { success: false, message: 'New password and confirmation do not match.' };
  }

  // Mock checking current password
  if (currentPass !== 'owner123') {
    return { success: false, message: 'Current password is incorrect.' };
  }

  return { success: true, message: 'Password updated successfully!' };
}

/**
 * Saves owner security question and answer hash to mock storage.
 */
export async function saveSecurityQuestionMock(
  question: string,
  answer: string
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!question) {
    return { success: false, message: 'Please select a security question.' };
  }

  if (!answer || answer.trim().length === 0) {
    return { success: false, message: 'Security answer cannot be empty.' };
  }

  // Store security question settings locally
  if (typeof window !== 'undefined') {
    localStorage.setItem('owner_security_question', question);
    // Simple mock hash of answer for UI demonstrations
    localStorage.setItem('owner_security_answer_hash', btoa(answer.trim().toLowerCase()));
  }

  return { success: true, message: 'Security question saved successfully!' };
}

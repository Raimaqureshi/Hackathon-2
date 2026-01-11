// frontend/tests/unit/test_signup.tsx
import { render, screen } from '@testing-library/react';
import SignupForm from '../../src/components/auth-form'; // Assuming AuthForm handles signup

describe('SignupForm', () => {
  it('renders a signup form with email and password fields', () => {
    render(<SignupForm type="signup" onSubmit={() => {}} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });
});

// frontend/tests/unit/test_login.tsx
import { render, screen } from '@testing-library/react';
import LoginForm from '../../src/components/auth-form'; // Assuming AuthForm handles login

describe('LoginForm', () => {
  it('renders a login form with email and password fields', () => {
    render(<LoginForm type="login" onSubmit={() => {}} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});

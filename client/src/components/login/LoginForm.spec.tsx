import { expect } from 'vitest';
import { LoginForm } from './LoginForm';
import { useLogin } from '@/hooks/useLogin';
import { render, screen, fireEvent } from '@testing-library/react';

describe('LoginForm', () => {

  beforeEach(() => {
    (useLogin as vi.Mock).mockReturnValue({
      handleSubmit: vi.fn().mockResolvedValue(null),
  });


  it('renders without crashing', () => {
    render(<LoginForm/>);
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('calls handleSubmit when the form is submitted', async () => {
    render(<LoginForm/>);
    fireEvent.update(screen.getByLabelText(/Username/i), 'Test username');
    fireEvent.update(screen.getByLabelText(/Password/i), 'Test password');
    fireEvent.submit(screen.getByRole('form'));
    expect(useLogin.handleSubmit).toHaveBeenCalledTimes(1);
  });
})
});

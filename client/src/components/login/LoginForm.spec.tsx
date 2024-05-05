import { expect } from 'vitest';
import { LoginForm } from './LoginForm';
import * as useLoginModule from '@/hooks/useLogin';

describe('LoginForm', () => {
  let originalUseLogin: useLogin;
  let mockUseLogin: any;

  beforeEach(() => {
    originalUseLogin = useLoginModule.useLogin;
    mockUseLogin = {
      handleSubmit: vi.fn().mockResolvedValue(),
    };
    useLoginModule.useLogin = () => mockUseLogin;
  });

  afterEach(() => {
    useLoginModule.useLogin = originalUseLogin;
  });

  it('renders without crashing', () => {
    render(LoginForm);
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('calls handleSubmit when the form is submitted', async () => {
    render(LoginForm);
    fireEvent.update(screen.getByLabelText(/Username/i), 'Test username');
    fireEvent.update(screen.getByLabelText(/Password/i), 'Test password');
    fireEvent.submit(screen.getByRole('form'));
    expect(mockUseLogin.handleSubmit).toHaveBeenCalledTimes(1);
  });
});
import { render, fireEvent } from '@testing-library/react';
import { WorkspaceList }  from './WorkspaceList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import selectEvent from 'react-select-event'

vi.mock("@tanstack/react-query", async (importOriginal) => {
    const actual = await importOriginal() as typeof importOriginal;
    return {
        ...actual,
        useQuery: vi.fn().mockReturnValueOnce({
            data: [
                { id: 1, name: 'Workspace 1' },
                { id: 2, name: 'Workspace 2' },
            ],
            isLoading: false,
            isError: false,
        }),
    }
  });

const setActiveWorkspace = vi.fn();

vi.mock('@/contexts/workspace/useWorkspace', () => ({
  useWorkspace: () => ({
    setActiveWorkspace,
  }),
}));



describe('WorkspaceList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it('calls setActiveWorkspace on value change', async () => {
    vi.mock('@/hooks/useToken', () => ({
      useToken: () => ({
        token: 'token',
      }),
    }));

    const { getByText } = render(
        <QueryClientProvider client={queryClient}>
            <WorkspaceList />
        </QueryClientProvider>
        );

    await selectEvent.select(getByText('Workspace'), 'Workspace 1');
    expect(setActiveWorkspace).toHaveBeenCalledWith({ id: 1, name: 'Workspace 1' });
  });
});

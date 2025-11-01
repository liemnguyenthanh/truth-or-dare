import { act,fireEvent, render, screen, waitFor } from '@testing-library/react';

import { QuickModePage } from '@/app/quick/QuickModePage';

// Mock question data
const mockQuestions = {
  '18': [
    { id: '1', type: 'truth' as const, question: 'Truth question 1' },
    { id: '2', type: 'dare' as const, question: 'Dare question 1' },
    { id: '3', type: 'truth' as const, question: 'Truth question 2' },
    { id: '4', type: 'dare' as const, question: 'Dare question 2' },
  ],
  party: [
    { id: '5', type: 'truth' as const, question: 'Party truth 1' },
    { id: '6', type: 'dare' as const, question: 'Party dare 1' },
  ],
};

// Mock the question data imports
jest.mock('@/data/questions/18', () => ({
  EighteenQuestions: mockQuestions['18'],
}));

jest.mock('@/data/questions/party', () => ({
  PartyQuestions: mockQuestions.party,
}));

// Mock DOM methods
const mockNav = {
  style: { display: '' },
};
const mockMain = {
  style: { paddingTop: '' },
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
    if (selector === 'nav') return mockNav as any;
    if (selector === 'main') return mockMain as any;
    return null;
  });
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('QuickModePage Integration', () => {
  it('should render category selection initially', () => {
    render(<QuickModePage />);

    expect(screen.getByText('Chọn chế độ chơi')).toBeInTheDocument();
    expect(screen.getByText('18+')).toBeInTheDocument();
    expect(screen.getByText('Party')).toBeInTheDocument();
  });

  it('should start game when category is selected', () => {
    render(<QuickModePage />);

    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    expect(screen.getByText('Chọn loại câu hỏi')).toBeInTheDocument();
    expect(screen.getByText('Quay lại')).toBeInTheDocument();
  });

  it('should show truth/dare selection after category selection', () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // Should show truth/dare buttons
    expect(screen.getByText('Thật')).toBeInTheDocument();
    expect(screen.getByText('Thách')).toBeInTheDocument();
  });

  it('should display question after truth selection', async () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // Select truth
    const truthButton = screen.getByText('Thật').closest('button');
    fireEvent.click(truthButton!);

    // Should show loading
    expect(screen.getByText('Đang lật bài...')).toBeInTheDocument();

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(screen.getByText(/Truth question/)).toBeInTheDocument();
    });
  });

  it('should display question after dare selection', async () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('Party').closest('button');
    fireEvent.click(categoryButton!);

    // Select dare
    const dareButton = screen.getByText('Thách').closest('button');
    fireEvent.click(dareButton!);

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(screen.getByText(/Dare question/)).toBeInTheDocument();
    });
  });

  it('should show stats after question is displayed', async () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // Select truth
    const truthButton = screen.getByText('Thật').closest('button');
    fireEvent.click(truthButton!);

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(screen.getByText(/Thật: 1/)).toBeInTheDocument();
      expect(screen.getByText(/Thách: 0/)).toBeInTheDocument();
    });
  });

  it('should allow selecting next question type', async () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // Select truth
    const truthButton = screen.getByText('Thật').closest('button');
    fireEvent.click(truthButton!);

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      // Should show next question selection
      expect(screen.getByText('Chọn loại câu hỏi tiếp theo')).toBeInTheDocument();
    });
  });

  it('should go back to category selection when back button is clicked', () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // Click back button
    const backButton = screen.getByText('Quay lại');
    fireEvent.click(backButton);

    // Should return to category selection
    expect(screen.getByText('Chọn chế độ chơi')).toBeInTheDocument();
  });

  it('should handle complete game flow', async () => {
    render(<QuickModePage />);

    // 1. Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // 2. Select truth
    const truthButton = screen.getByText('Thật').closest('button');
    fireEvent.click(truthButton!);

    // 3. Wait for question
    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(screen.getByText(/Truth question/)).toBeInTheDocument();
    });

    // 4. Select dare for next question
    const dareButton = screen.getByText('Thách').closest('button');
    fireEvent.click(dareButton!);

    // 5. Wait for next question
    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(screen.getByText(/Dare question/)).toBeInTheDocument();
    });

    // 6. Check stats
    expect(screen.getByText(/Thật: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Thách: 1/)).toBeInTheDocument();
  });

  it('should hide navigation during game', () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    expect(mockNav.style.display).toBe('none');
    expect(mockMain.style.paddingTop).toBe('0');
  });

  it('should restore navigation when going back', () => {
    render(<QuickModePage />);

    // Select category
    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    // Go back
    const backButton = screen.getByText('Quay lại');
    fireEvent.click(backButton);

    expect(mockNav.style.display).toBe('');
    expect(mockMain.style.paddingTop).toBe('');
  });
});

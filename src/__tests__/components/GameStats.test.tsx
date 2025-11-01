import { render, screen } from '@testing-library/react';

import { GameStats } from '@/app/quick/components/GameStats';

describe('GameStats', () => {
  it('should render stats when selectedType is truth', () => {
    render(
      <GameStats
        selectedType="truth"
        truthCount={5}
        dareCount={3}
        usedQuestions={new Set(['1', '2', '3', '4', '5', '6', '7', '8'])}
        totalQuestions={20}
      />
    );

    expect(screen.getByText('Thật: 5')).toBeInTheDocument();
    expect(screen.getByText('Thách: 3')).toBeInTheDocument();
    expect(screen.getByText('Tổng: 8/20')).toBeInTheDocument();
  });

  it('should render stats when selectedType is dare', () => {
    render(
      <GameStats
        selectedType="dare"
        truthCount={2}
        dareCount={7}
        usedQuestions={new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])}
        totalQuestions={15}
      />
    );

    expect(screen.getByText('Thật: 2')).toBeInTheDocument();
    expect(screen.getByText('Thách: 7')).toBeInTheDocument();
    expect(screen.getByText('Tổng: 9/15')).toBeInTheDocument();
  });

  it('should render stats when selectedType is null', () => {
    render(
      <GameStats
        selectedType={null}
        truthCount={0}
        dareCount={0}
        usedQuestions={new Set()}
        totalQuestions={10}
      />
    );

    expect(screen.getByText('Thật: 0')).toBeInTheDocument();
    expect(screen.getByText('Thách: 0')).toBeInTheDocument();
    expect(screen.getByText('Tổng: 0/10')).toBeInTheDocument();
  });

  it('should handle zero counts', () => {
    render(
      <GameStats
        selectedType="truth"
        truthCount={0}
        dareCount={0}
        usedQuestions={new Set()}
        totalQuestions={5}
      />
    );

    expect(screen.getByText('Thật: 0')).toBeInTheDocument();
    expect(screen.getByText('Thách: 0')).toBeInTheDocument();
    expect(screen.getByText('Tổng: 0/5')).toBeInTheDocument();
  });

  it('should handle large counts', () => {
    render(
      <GameStats
        selectedType="dare"
        truthCount={999}
        dareCount={1000}
        usedQuestions={new Set(Array.from({ length: 1999 }, (_, i) => i.toString()))}
        totalQuestions={2000}
      />
    );

    expect(screen.getByText('Thật: 999')).toBeInTheDocument();
    expect(screen.getByText('Thách: 1000')).toBeInTheDocument();
    expect(screen.getByText('Tổng: 1999/2000')).toBeInTheDocument();
  });

  it('should handle empty usedQuestions set', () => {
    render(
      <GameStats
        selectedType="truth"
        truthCount={1}
        dareCount={1}
        usedQuestions={new Set()}
        totalQuestions={10}
      />
    );

    expect(screen.getByText('Tổng: 2/10')).toBeInTheDocument();
  });

  it('should handle zero totalQuestions', () => {
    render(
      <GameStats
        selectedType="truth"
        truthCount={1}
        dareCount={1}
        usedQuestions={new Set(['1', '2'])}
        totalQuestions={0}
      />
    );

    expect(screen.getByText('Tổng: 2/0')).toBeInTheDocument();
  });

  it('should show correct notification for truth', () => {
    render(
      <GameStats
        selectedType="truth"
        truthCount={1}
        dareCount={0}
        usedQuestions={new Set(['1'])}
        totalQuestions={5}
      />
    );

    expect(screen.getByText('Đã chọn câu hỏi Thật')).toBeInTheDocument();
  });

  it('should show correct notification for dare', () => {
    render(
      <GameStats
        selectedType="dare"
        truthCount={0}
        dareCount={1}
        usedQuestions={new Set(['1'])}
        totalQuestions={5}
      />
    );

    expect(screen.getByText('Đã chọn câu hỏi Thách')).toBeInTheDocument();
  });

  it('should not show notification when selectedType is null', () => {
    render(
      <GameStats
        selectedType={null}
        truthCount={0}
        dareCount={0}
        usedQuestions={new Set()}
        totalQuestions={5}
      />
    );

    expect(screen.queryByText(/Đã chọn câu hỏi/)).not.toBeInTheDocument();
  });

  it('should handle negative counts gracefully', () => {
    render(
      <GameStats
        selectedType="truth"
        truthCount={-1}
        dareCount={-2}
        usedQuestions={new Set()}
        totalQuestions={5}
      />
    );

    expect(screen.getByText('Thật: -1')).toBeInTheDocument();
    expect(screen.getByText('Thách: -2')).toBeInTheDocument();
    expect(screen.getByText('Tổng: -3/5')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    const { container } = render(
      <GameStats
        selectedType="truth"
        truthCount={1}
        dareCount={1}
        usedQuestions={new Set(['1', '2'])}
        totalQuestions={10}
      />
    );

    const statsContainer = container.querySelector('.bg-purple-100');
    expect(statsContainer).toBeInTheDocument();
  });
});

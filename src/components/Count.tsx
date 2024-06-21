'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { RootState } from '@/store/store';
import { styled } from '@mui/system';
import { Typography, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled(Box)({
  display: 'flex',
  gap: '1rem',
  paddingTop: '4rem',
  marginBottom: '1rem',
  height: '100%',
});

const ProgressBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '0.5rem',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  background: '#fff',
});

const Progress = styled('div')(({ theme }) => ({
  height: '4px',
  backgroundColor: '#E0E0E0',
  borderRadius: '8px',
  marginBottom: '0.5rem',
  position: 'relative',
  width: '100%',
}));

const ProgressBar = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '8px',
  transition: 'width 0.3s ease-in-out',
  width: '0%',
}));

const Count: React.FC = () => {
  const { progress, reactProgress, vueProgress, selectedCategory } =
    useSelector((state: RootState) => state.progress);

  const formatProgress = (value: number): string => {
    return `${Math.floor(value)}%`;
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
          },
        },
      },
    },
  };

  const chartStyle = {
    width: '200px',
    height: '200px',
    margin: '0 auto',
  };

  const renderProgressBox = (title: string, value: number, color: string) => (
    <ProgressBox>
      <Typography
        variant='h3'
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      <div style={chartStyle}>
        <Doughnut data={doughnutData(value, color)} options={doughnutOptions} />
      </div>
      <Progress>
        <ProgressBar
          className={`bg-${color.split('#')[1]}`}
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />
      </Progress>
      <Typography
        variant='body2'
        sx={{
          fontSize: '1rem',
          color: 'text.secondary',
        }}
      >
        {formatProgress(value)}
      </Typography>
    </ProgressBox>
  );

  const doughnutData = (value: number, color: string) => ({
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, '#E0E0E0'],
        hoverBackgroundColor: [color, '#F5F5F5'],
      },
    ],
  });

  return (
    <Container>
      {renderProgressBox('전체진행도', progress, '#4CAF50')}
      {selectedCategory !== 'vue' &&
        renderProgressBox('리액트진행도', reactProgress, '#FFC107')}
      {selectedCategory !== '리액트' &&
        renderProgressBox('뷰진행도', vueProgress, '#9C27B0')}
    </Container>
  );
};

export default Count;

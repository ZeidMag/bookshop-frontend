import React from 'react';

const fillColor = 'var(--secondary-color)';
const strokeColor = 'var(--third-color)';

const LoadingSpinner = () => {
  return (
    <svg
      style={{
        margin: 'auto',
        background: '#fff',
        display: 'block',
        width: '200px',
        height: '200px',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M20 25L80 25L80 75L20 75Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
      ></path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.5;0.501;1"
          values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.5;0.5001;1"
          values="1;1;0;0"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.166s"
          keyTimes="0;0.5;0.501;1"
          values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.166s"
          keyTimes="0;0.5;0.5001;1"
          values="1;1;0;0"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.33s"
          keyTimes="0;0.5;0.501;1"
          values="M50 25L80 25L80 75L50 75;M50 25L50 20L50 80L50 75;M50 25L80 25L80 75L50 75;M50 25L80 25L80 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.33s"
          keyTimes="0;0.5;0.5001;1"
          values="1;1;0;0"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.33s"
          keyTimes="0;0.499;0.5;1"
          values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.33s"
          keyTimes="0;0.4999;0.5;1"
          values="0;0;1;1"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.166s"
          keyTimes="0;0.499;0.5;1"
          values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.166s"
          keyTimes="0;0.4999;0.5;1"
          values="0;0;1;1"
        ></animate>
      </path>
      <path
        d="M50 25L80 25L80 75L50 75"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.499;0.5;1"
          values="M50 25L20 25L20 75L50 75;M50 25L20 25L20 75L50 75;M50 25L50 20L50 80L50 75;M50 25L20 25L20 75L50 75"
        ></animate>
        <animate
          attributeName="opacity"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          keyTimes="0;0.4999;0.5;1"
          values="0;0;1;1"
        ></animate>
      </path>
    </svg>
  );
};

export default LoadingSpinner;

import React from 'react';

export type IconName =
  | 'close'
  | 'star'
  | 'star-empty'
  | 'alcove'
  | 'utomatic'
  | 'petrol'
  | 'error'
  | 'map';

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({
  name,
  width = 20,
  height = 20,
  className = '',
}: IconProps) {
  return (
    <svg width={width} height={height} className={className} aria-hidden="true">
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
}

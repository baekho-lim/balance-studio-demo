import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
export { MultilingualText, SEOConfig, ThemeConfig } from '@cgos/core';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare function Button({ variant, size, isLoading, leftIcon, rightIcon, children, className, disabled, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

interface BadgeProps {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    children: React.ReactNode;
    className?: string;
}
declare function Badge({ variant, size, children, className, }: BadgeProps): react_jsx_runtime.JSX.Element;

interface KpiCardProps {
    title: string;
    value: number | string;
    change?: number;
    changeLabel?: string;
    format?: 'number' | 'currency' | 'percent';
    icon?: React.ReactNode;
    className?: string;
}
declare function KpiCard({ title, value, change, changeLabel, format, icon, className, }: KpiCardProps): react_jsx_runtime.JSX.Element;

export { Badge, type BadgeProps, Button, type ButtonProps, KpiCard, type KpiCardProps };

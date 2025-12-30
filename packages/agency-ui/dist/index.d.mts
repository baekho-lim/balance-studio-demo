import * as React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}
/**
 * SectionHeader - Reusable section title component
 * Used across all templates for consistent section headings
 */
declare function SectionHeader({ title, subtitle, align, size, className, titleClassName, subtitleClassName, }: SectionHeaderProps): React.ReactElement;

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
/**
 * Badge - Reusable badge/tag component
 * Includes fitness level variants for pilates/gym templates
 */
declare function Badge({ children, variant, size, className, }: BadgeProps): React.ReactElement;
/**
 * LevelBadge - Convenience wrapper for fitness level badges
 */
interface LevelBadgeProps {
    level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showLabel?: boolean;
}
declare function LevelBadge({ level, size, className, showLabel, }: LevelBadgeProps): React.ReactElement;

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    border?: boolean;
}
/**
 * Card - Base card component with customizable styling
 */
declare function Card({ children, className, hover, padding, rounded, shadow, border, }: CardProps): React.ReactElement;
/**
 * CardHeader - Header section for cards
 */
interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}
declare function CardHeader({ children, className }: CardHeaderProps): React.ReactElement;
/**
 * CardBody - Main content section for cards
 */
interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}
declare function CardBody({ children, className }: CardBodyProps): React.ReactElement;
/**
 * CardFooter - Footer section for cards
 */
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}
declare function CardFooter({ children, className }: CardFooterProps): React.ReactElement;
/**
 * FeatureCard - Card with icon/emoji, title, and description
 * Used for class cards, service cards, etc.
 */
interface FeatureCardProps {
    icon?: React.ReactNode;
    emoji?: string;
    title: string;
    description?: string;
    badge?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    aspectRatio?: string;
    iconBgClassName?: string;
    onClick?: () => void;
}
declare function FeatureCard({ icon, emoji, title, description, badge, footer, className, aspectRatio, iconBgClassName, onClick, }: FeatureCardProps): React.ReactElement;

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    external?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}
/**
 * Button - Reusable button component with link support
 */
declare function Button({ children, variant, size, href, external, disabled, fullWidth, className, onClick, type, }: ButtonProps): React.ReactElement;
/**
 * CTAGroup - Container for call-to-action buttons
 */
interface CTAGroupProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    gap?: 'sm' | 'md' | 'lg';
}
declare function CTAGroup({ children, className, align, gap, }: CTAGroupProps): React.ReactElement;

declare const UI_VERSION = "0.1.0";

export { Badge, type BadgeProps, type BadgeVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, CTAGroup, type CTAGroupProps, Card, CardBody, CardFooter, CardHeader, type CardProps, FeatureCard, type FeatureCardProps, LevelBadge, type LevelBadgeProps, SectionHeader, type SectionHeaderProps, UI_VERSION };

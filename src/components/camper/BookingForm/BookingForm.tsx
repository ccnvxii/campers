'use client';

import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import styles from './BookingForm.module.css';

interface BookingFormData {
  name: string;
  email: string;
  bookingDate?: string;
  comment?: string;
}

interface BookingFormProps {
  camperName?: string;
}

export default function BookingForm({ camperName }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking submitted:', data);
    alert(`Thank you! Request for ${camperName || 'camper'} has been sent.`);
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Book your campervan now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          placeholder="Name*"
          label={errors.name ? 'Name*' : undefined}
          error={errors.name?.message}
          {...register('name', {
            required: 'Please enter your full name.',
          })}
        />

        <Input
          type="email"
          placeholder="Email*"
          label={errors.email ? 'Email*' : undefined}
          error={errors.email?.message}
          {...register('email', {
            required: 'Please enter a valid email address.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address.',
            },
          })}
        />

        <Button type="submit" variant="primary" className={styles.submitBtn}>
          Send
        </Button>
      </form>
    </div>
  );
}

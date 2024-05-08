import React from 'react';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FormLogin from '../fragments/FormLogin';
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
expect.extend(matchers);

describe('LoginInput component', () => {
  // cleanup
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<FormLogin login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('masukan email...');

    // action
    await userEvent.type(emailInput, 'emailtest');

    // assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<FormLogin login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('******************');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<FormLogin login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('masukan email...');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText(
      '******************',
    );
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await fireEvent.submit(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});

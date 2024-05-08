import React from 'react';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FormRegister from '../fragments/FormRegister';
/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */
expect.extend(matchers);

describe('RegisterInput component', () => {
  // cleanup
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    // arrange
    render(<FormRegister register={() => {}} />);
    const usernameInput = screen.getByPlaceholderText('masukan username...');

    // action
    await userEvent.type(usernameInput, 'usernametest');

    // assert
    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<FormRegister register={() => {}} />);
    const emailInput = screen.getByPlaceholderText('masukan email...');

    // action
    await userEvent.type(emailInput, 'emailtest');

    // assert
    expect(emailInput).toHaveValue('emailtest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<FormRegister register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('*********');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call register function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<FormRegister register={mockRegister} />);
    const usernameInput = await screen.getByPlaceholderText(
      'masukan username...',
    );
    await userEvent.type(usernameInput, 'usernametest');
    const emailInput = await screen.getByPlaceholderText('masukan email...');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('*********');
    await userEvent.type(passwordInput, 'passwordtest');
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });

    // action
    await fireEvent.submit(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'usernametest',
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});

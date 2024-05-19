import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from '../src/hooks/useFetch';
const API_URL = 'https://piccolo-server.vercel.app/words';
export const testRandomWordFetch = () => {
  describe('useFetch', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return the random word and isLoading state', async () => {
      const mockWords = ['apple', 'banana', 'cherry'];
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: true, data: mockWords }),
      } as any);
      const { result, waitForNextUpdate } = renderHook(() => useFetch());
      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        await waitForNextUpdate();
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.word).toBeDefined();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(API_URL);
    });

    it('should handle error when fetching data', async () => {
      const mockError = new Error('Failed to fetch data');
      global.fetch = jest.fn().mockRejectedValue(mockError);
      console.error = jest.fn();
      const { result, waitForNextUpdate } = renderHook(() => useFetch());
      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        await waitForNextUpdate();
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.word).toBe('');
      expect(console.error).toHaveBeenCalledWith('Error fetching data:', mockError);
    });
  });
};

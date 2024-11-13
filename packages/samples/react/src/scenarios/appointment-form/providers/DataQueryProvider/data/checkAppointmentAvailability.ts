import { sleep } from '../utils/sleep';

export const checkAppointmentAvailability = async (time?: string): Promise<boolean> => {
	await sleep(50);
	return time?.endsWith(':30') ?? false;
};

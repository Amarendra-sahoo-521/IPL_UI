export const handleError = (error: any) => {
    const errorDetails = error?.response?.data || { message: 'Something went wrong' };
    return errorDetails;
};
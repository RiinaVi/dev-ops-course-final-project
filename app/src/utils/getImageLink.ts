const getImageLink = (fileName: string) => {
 return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
};

export default getImageLink;

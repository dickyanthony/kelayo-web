import { Card, CardBody, CardFooter } from '@nextui-org/react';
export default ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Card className="border-none bg-background/60 dark:bg-default-100/50 w-full" shadow="sm">
          <CardBody className="overflow-visible p-0">
            <div className="relative col-span-6 md:col-span-4">
              <div className="skeleton-loader h-36 w-full"></div>
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <div className="skeleton-loader h-4 w-20"></div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

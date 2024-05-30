import { Card, CardBody } from '@nextui-org/react';

export default ({ count }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {[...Array(count)].map((_, index) => (
        <Card className="border-none bg-background/60 dark:bg-default-100/50 w-full" shadow="sm">
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <div className="skeleton-loader h-36 w-full"></div>
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0 w-full">
                    <div className="skeleton-loader h-4 w-1/2 mb-2"></div>
                    <div className="flex flex-wrap w-full items-center mb-4 mt-2 gap-2">
                      <div className="skeleton-loader h-4 w-20"></div>
                      <div className="skeleton-loader h-4 w-20"></div>
                      <div className="skeleton-loader h-4 w-20"></div>
                    </div>
                    <div className="skeleton-loader h-24 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

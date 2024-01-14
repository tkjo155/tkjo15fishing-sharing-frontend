import React, { useState } from "react";
import { Spot } from "@/Types";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

type SpotItemProps = {
  spot: Spot;
};

const SpotItem = ({ spot }: SpotItemProps) => {
  return (
    <NextUIProvider>
      <Card>
        <CardBody>
          <strong>{spot.name}</strong> - {spot.prefecture}
        </CardBody>
      </Card>
    </NextUIProvider>
  );
};

export default SpotItem;

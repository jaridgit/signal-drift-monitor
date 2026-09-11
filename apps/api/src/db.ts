/**
 * DynamoDB connection helper. The client setup is done for you — the
 * table design and the read/write functions are your TODO, same as the
 * "data modeling" expectation from the Ridgeline project. Think about a
 * single-table design (partition key + sort key covering drivers,
 * plans, and actuals) before you start writing queries against it.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import "dotenv/config";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "eu-central-1",
  endpoint: process.env.AWS_ENDPOINT, // unset when pointed at real AWS
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "local",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "local",
  },
});

export const docClient = DynamoDBDocumentClient.from(client);
export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME ?? "signal-drift";

// TODO: putActual(actual: ActualValue): Promise<void>
// TODO: getDriverHistory(driverId: string, periods: number): Promise<ActualValue[]>
// TODO: putPlannedValue(plan: PlannedValue): Promise<void>

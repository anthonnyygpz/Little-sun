import { ClientInfo } from "./client.types";
import { SelectedIdsService } from "./nailService.types";
import { SelectedIdsDesign } from "./nailDesign.types";
import { SculpingNailSizeForm } from "./sculpingNailSize.types";
import { DateAndTime } from "./dateAndTime.types";

export type Form = {
  client?: ClientInfo;
  sculpingNailSize?: SculpingNailSizeForm;
  nailService?: SelectedIdsService;
  nailDesign?: SelectedIdsDesign;
  dateAndTime?: DateAndTime;
};

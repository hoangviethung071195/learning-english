import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform<T>(
    value: any[],
    info: {
      key: string;
      value: any;
    }
  ): any[] {
    return value.filter((item) => item[info.key] === info.value);
  }
}

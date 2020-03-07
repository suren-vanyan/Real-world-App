import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  currentPage: number;

  vehicles: Vehicle[];
  makes: KeyValuePair[];
  totalItems: any;
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true }
  ];
  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.currentPage = 1;
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes  as KeyValuePair[];
    });
    this.populateVehicles();
  }

  populateVehicles() {
    this.vehicleService
      .getVehicles(this.query)
      .toPromise()
      .then(result => {
        this.vehicles = (result as any).items;
        this.totalItems = (result as any).totalItems;
      });
    console.log('vehicles', this.vehicles);
  }
  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  getPageData(event) {
    this.query.page = event.page;
    this.query.pageSize = event.itemsPerPage;
    this.populateVehicles();
  }
}

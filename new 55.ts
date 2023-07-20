how can i make the delete button shwo this swal.fire and  showCancelButton will cancel and the confirmButtonColor will delete the record in my siteComponent html code 

Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})

In my header component, i added the sites in my header component like this :
<li class="header__item">
	<a routerLink='/admin' routerLinkActive="active" class="header__link"></a>
</li>

If i wanted to add the AddEditSiteComponent like this but it will only be visible when the Add Site link is clicked in the SiteComponent html, how can i do it. 
Also, i want to make the text dynamic so that if the user clicks on the add Site button, the header will be Add in the AddEditSiteComponent and if the 
edit link is clicked, the header will be displayed like Edit. 


@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})

export class SiteComponent implements OnInit, OnDestroy {
    sites: PortalSite[] = [];
	private subscription: subscription = new subscription():
	selectedSiteId?: number;
	
	
    constructor(private formService: PortalServicesite, private route: ActivatedRoute) {}

    ngOnInit(): void { 
		this.subscription= this.formService.getAll().subscribe((sites) => this.sites = sites.slice());
    }
	
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
    }
	
	loadSite(): void{
		this.formService.getAll().subscribe(sites => {
            this.sites = sites.slice(); 
        }));
	}

    deleteSite(id: number) {
        this.formService.delete(id).subscribe(() =>{
			this.loadSite();
			console.log(`site with id:${id} deleted`);
		});
		
    }
}

<div class="main-container">
    <table>
        <tr style="background-color: #BCD2EE; style="width: 120px;">
            <th>ID</th>
            <th>Names</th>
            <th>key</th>
            <th>Division</th>
            <th>Admin Access Group</th>
            <th>Active</th>
            <th style="width: 80px">Actions</th>
        </tr>
		
        <tr *ngFor="let site of sites; let i = index"
            [class.active-row]="selectedSiteId === site.id">
            <td style="text-align: right;">{{site.id}}</td>
            <td> <a [routerLink]="['/content-section']"
                       (click)="selectedSiteId = site.id" >{{site.name}}</a></td>
            <td>{{site.key}}</td>
            <td>{{site.divisionId}}</td>
            <td>{{site.groupNames}}</td>
            <td>{{site.isActive ? 'Yes' : 'No'}}</td>
            <td>
                <a [routerLink]="['/admin/site/', site.id]">
                <span class="ss-icon ss-pencil-down"></span> EDIT</a> |
                <a (click)="deleteSite(site.id); $event.preventDefault()">
                <span class="ss-icon ss-trash"></span>DELETE</a>
            </td>
        </tr>
    </table>
    <br>
    <button  routerLink="/admin/sites/create" routerLinkActive="active">Add site</button>
</div>


// this is the form component  

export interface DropValues {
    id: number;
    descr: string;
}

@Component({
    selector: 'app-add-edit-site',
    templateUrl: './add-edit-site.component.html',
    styleUrls: ['./add-edit-site.component.scss']
})

export class AddEditSiteComponent implements OnInit {
    
	subscription: Subscription;
	
	isValidForm: false;
    adminForm: FormGroup;
	isEdit = false;
	editIndex?= number;

    id?: FormControl;
    name?: FormControl;
    key?: FormControl;
    groupNames?: FormControl;
    userNames?: FormControl;
    isActive?: FormControl;
    contactEmail?: FormControl;
    contactEmailText?: FormControl;
    reportPath?: FormControl;
    reportArchivePath?: FormControl;
    helpUrl?: FormControl;
    manualReportPath?: FormControl;
    manualReportSite?: FormControl;
    manualReportSiteContent?: FormControl;
    usageExtractPath?: FormControl;
    divisionId?: FormControl;
    defaultSite?: FormControl;
	
	
    selectedValues: DropValues[] = [];
    portalSite?: PortalSite;

    constructor(private formBuilder: FormBuilder, private portaSiteService: PortaSiteService, 
		private router: Router,  private route: ActivatedRoute) {
		// this.isValidForm = false;

		this.adminForm = this.formBuilder.group({});

		if (this.adminForm) {
			this.adminForm.addControl('id', this.id = formBuilder.control('', Validators.required));
			this.adminForm.addControl('name', this.name = this.formBuilder.control('', Validators.required));
			this.adminForm.addControl('key', this.key = this.formBuilder.control('', Validators.required));
			this.adminForm.addControl('groupNames',  this.groupNames = this.formBuilder.control(''));
			this.adminForm.addControl('userNames',  this.userNames = this.formBuilder.control(''));
			this.adminForm.addControl('isActive',  this.isActive = this.formBuilder.control(''));
			this.adminForm.addControl('contactEmail',  this.contactEmail = this.formBuilder.control(''));
			this.adminForm.addControl('contactEmailText',  this.contactEmailText = this.formBuilder.control(''));
			this.adminForm.addControl('reportPath',  this.reportPath = this.formBuilder.control(''));
			this.adminForm.addControl('reportArchivePath',  this.reportArchivePath = this.formBuilder.control(''));
			this.adminForm.addControl('helpUrl', this.helpUrl =  this.formBuilder.control(''));
			this.adminForm.addControl('manualReportPath', this.manualReportPath = this.formBuilder.control(''))
			this.adminForm.addControl('manualReportsite', this.manualReportsite = this.formBuilder.control(''));
			this.adminForm.addControl('manualReportsiteContent', this.manualReportsiteContent = this.formBuilder.control(''));
			this.adminForm.addControl('usageExtractPath', this.usageExtractPath = this.formBuilder.control(''));
			this.adminForm.addControl('divisionId', this.divisionId = this.formBuilder.control(''));
			this.adminForm.addControl('defaultsite', this.helpUrl =   this.formBuilder.control('', Validators.required));
		}
	}
	
    dataValues: Array<string> = [];
    modelValue?: string = undefined;
    data: DropValues[] = [
        { id: 0, descr: 'This is the first Option' },
        { id: 1, descr: 'This is the second option' },
        { id: 2, descr: 'This is the third option' },
        { id: 3, descr: 'This is the fourth option' },
        { id: 4, descr: 'This is the fifth Option' },
        { id: 5, descr: 'This is the sixth Option' }
    ];

    ngOnInit() {
		this.dataValues = this.data.slice(0, 30).map((item, index) => `${index}: ${item.descr}`);
		
		this.route.data.subscribe(data: SiteResolvedData => {
		  if (data.site) {
			this.isEdit = true;
			this.adminForm.patchValue(data.site); 
		  } else {
			// If this is a "create" operation, remove the "id" control from the form
			this.adminForm.removeControl('id');
		  }
		});
	}


    onSelectionChange(event: any) {
        console.log(event);
    }

	onSubmit() {
		this.portaSiteService.save(this.adminForm.value).subscribe(
			() => this.router.navigate(['/admin/site/']) );
	}

    cancel() {
        console.log('form is resetted');
        this.adminForm.reset();
		this.router.navigate(['/admin/site']); // Add this line
    }
}



<form [formGroup]="adminForm"  (ngSubmit)="onSubmit()"  class="main-container">

  <div class="form-container">
    <div class="left">

      <div class="form-group">
        <label>Portal Site Service Site ID</label>
        <input type="text" formControlName="id">
        <div class="errorEdit" *ngIf="adminForm.get('id')?.touched && adminForm.get('id')?.invalid">
          Portal Site Service Site ID is required.
        </div>
      </div>

      <div class="form-group">
        <label>Portal Service Site</label>
        <input type="text" formControlName="name">
        <div class="errorEdit" *ngIf="adminForm.get('name')?.touched && adminForm.get('name')?.invalid">
          Portal Service Site is required.
        </div>
      </div>

      <div class="form-group">
        <label>Portal Service Site Key</label>
        <input type="text" formControlName="key">
        <div class="errorEdit" *ngIf="adminForm.get('key')?.touched && adminForm.get('key')?.invalid">
          Portal Service Site Key is required.
        </div>
      </div>

      <div class="form-group">
        <label>Contact Email</label>
        <input type="text" formControlName="contactEmail">
      </div>

      <div class="form-group">
        <label>Contact Email Text</label>
        <input type="text" formControlName="contactEmailText">
      </div>

      <div class="form-group">
        <label>Report Path</label>
        <textarea formControlName="reportPath"></textarea>
      </div>

      <div class="form-group">
        <label>Report Archive Path</label>
        <textarea type="text" formControlName="reportArchivePath"></textarea>
      </div>
	 
      <div class="form-group">
        <label>Division ID</label>
        // <msui-single-select formControlName="divisionId" customClass="drp-exa" [Items]="datavalues" [(ngModel)]="modelValue" name="values" (select)="onSelectionChange($event)"></msui-single-select>
      </div>

      <div class="form-group">
        <label>Default Site</label>
        <input type="checkbox" formControlName="defaultsite">{{portalServicesite?.value}}
      </div>
	 
      <div class="form-group">
        <label>
          <input type="checkbox" formControlName="IsActive">Active Site
        </label>
      </div>

    </div>

    <div class="right">

      <div class="form-group">
        <label>Manual Report Full URL</label>
        <textarea formControlName="manualReportPath"></textarea>
      </div>

      ...

    </div>
  </div>

  <div class="button-container">
    <button type="submit"  class="button save">Save</button>
    <button routerLink="/admin/sites" routerLinkActive="active" (click)="cancel()" class="button cancel">Cancel</button>
  </div>

  <br> <br>

</form>
<br>

// this is the service

import { Injectable } from '@angular/core';
import { PortalSite } from '../admin-component/models/portal-site.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortaSiteService {
	private portalSiteData: PortalSite[] = [];
	private portalSiteData$ = new BehaviorSubject<PortalSite[]>([]);

	constructor(private readonly httpClient: HttpClient){}
	save (portalSite: PortalSite): Observable<PortalSite[]> {
		if(portalSite.id){
			return this.httpClient.put<PortalSite>(`api/admin/sites/${portalSite.id}`, portalSite);
		}else{
			return this.httpClient.post<PortalSite>(`api/admin/sites/${portalSite.id}`, portalSite);
		} 
	}
	
	getAll(): Observable<PortalSite[]> {
		return this.httpClient.get<PortalSite[]>('api/admin/sites/');
	}
	
	// Method to get single site data by index
	get(id: number): Observable<PortalSite> {
		return this.httpClient.get<PortalSite>(`api/admin/sites/${id}`);
	} 

	delete(id: number) : Observable<any> {
    return this.httpClient.delete(`api/admin/sites/${id}`);
	}

}
 
 
// my routes in the app-module
const routes: Routes = [
  ...
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
  ...
];

//these are lazy loaded in the admin-module
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sites' 
  },
  {
    path: 'sites',
    component: SiteComponent 
  },
  {
	path: 'sites/create',
	component: AddEditSiteComponent
  },
  {
	path: 'sites/:id',
	component: AddEditSiteComponent,
	resolve: {
		site: SiteResolver
   },
	runGuardsAndResolvers: 'always'
  }
];


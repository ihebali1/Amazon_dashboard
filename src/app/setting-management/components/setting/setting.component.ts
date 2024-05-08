import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SettingService} from "../../Service/setting.service";
import {Gain} from "../../Models/gain";
import {Subscription} from "../../Models/subscription";
import {Tva} from "../../Models/tva";
import {Shipping} from "../../Models/shipping";

@Component({
    selector: 'vex-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


    gain: Gain;
    subscriptionI: Subscription;
    subscriptionP: Subscription;
    tvaTransaction: Tva;
    tvaTransport: Tva;
    shippingS: Shipping;
    shippingD: Shipping;
    applySettingTVA: FormGroup;
    applySettingShipping: FormGroup;
    applySettingSubscription: FormGroup;
    applySettingGain: FormGroup;

    isLinear = true;
    constructor(public router: Router, private _formBuilder: FormBuilder, private settingService: SettingService) {
        this.applySettingTVA = new FormGroup({
            tvaTransaction: new FormControl('', Validators.required),
            tvaTransport: new FormControl('', Validators.required),
        });
        this.applySettingShipping = new FormGroup({
            shippingS: new FormControl('', Validators.required),
            shippingD: new FormControl('', Validators.required),
        });
        this.applySettingSubscription = new FormGroup({
            subscriptionI: new FormControl('', Validators.required),
            subscriptionP: new FormControl('', Validators.required),
        });
        this.applySettingGain = new FormGroup({
            gain: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {

        this.settingService.getGain().subscribe((gain: Gain) => {
            this.gain = gain;
            this.settingService.getShipping().subscribe((ships: Shipping[]) => {
                ships.forEach(element => {
                    if (element.type === 'SAME_ZONE') {
                        this.shippingS = element;
                    }
                });
                this.settingService.getShipping().subscribe((shipd: Shipping[]) => {
                    shipd.forEach(element => {
                        if (element.type === 'DIFFERENT_ZONE') {
                            this.shippingD = element;
                        }
                    });
                    this.settingService.getTva().subscribe((tvat: Tva[]) => {
                        tvat.forEach(element => {
                            if (element.type === 'TRANSACTION') {
                                this.tvaTransaction = element;
                            }
                        });
                        this.settingService.getTva().subscribe((tvatr: Tva[]) => {
                            tvatr.forEach(element => {
                                if (element.type === 'TRANSPORT') {
                                    this.tvaTransport = element;
                                }
                            });
                            this.settingService.getSubscription().subscribe((subi: Subscription[]) => {
                                subi.forEach(element => {
                                    if (element.kind === 'INDIVIDUAL') {
                                        this.subscriptionI = element;
                                    }
                                });
                                this.settingService.getSubscription().subscribe((subp: Subscription[]) => {
                                    subp.forEach(element => {
                                        if (element.kind === 'PROFESSIONAL') {
                                            this.subscriptionP = element;
                                        }
                                    });
                                    this.applySettingShipping = this._formBuilder.group({
                                        shippingS: this.shippingS.amount,
                                        shippingD: this.shippingD.amount,
                                    });
                                    this.applySettingGain = this._formBuilder.group({
                                        gain: this.gain.percentage,
                                    });

                                    this.applySettingTVA = this._formBuilder.group({
                                        tvaTransaction: this.tvaTransaction.percentage,
                                        tvaTransport: this.tvaTransport.percentage,
                                    });

                                    this.applySettingSubscription = this._formBuilder.group({
                                        subscriptionI: this.subscriptionI.price,
                                        subscriptionP: this.subscriptionP.price,
                                    });

                                });
                            });
                        });
                    });
                });
            });
        });

    }

    save(type) {
        if (type === 'gain') {
            const settings = this.applySettingGain.getRawValue();
            this.settingService.updateGain(this.gain.id, {percentage: settings.gain}).subscribe(gain => {
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'info',
                    title: 'تم الحفظ بنجاح ',
                    timer: 1500
                });
            }, error => {
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'error',
                    title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                    timer: 2500
                });
            });
        }
        if (type === 'shipping') {
            const settings = this.applySettingShipping.getRawValue();
            this.settingService.updateShipping(this.shippingS.id, {amount: settings.shippingS}).subscribe(shippings => {
                this.settingService.updateShipping(this.shippingD.id, {amount: settings.shippingD}).subscribe(shippingd => {
                    Swal.fire({
                        showConfirmButton: false,
                        showCancelButton: false,
                        icon: 'info',
                        title: 'تم الحفظ بنجاح ',
                        timer: 1500
                    });
                }, error => {
                    Swal.fire({
                        showConfirmButton: false,
                        showCancelButton: false,
                        icon: 'error',
                        title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                        timer: 2500
                    });
                });
            }, error => {
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'error',
                    title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                    timer: 2500
                });
            });
        }

        if (type === 'subscription') {
            const settings = this.applySettingSubscription.getRawValue();
            this.settingService.updateSubscription(this.subscriptionI.id, {price: settings.subscriptionI}).subscribe(subscriptionI => {
                this.settingService.updateSubscription(this.subscriptionP.id, {price: settings.subscriptionP}).subscribe(subscriptionP => {
                    Swal.fire({
                        showConfirmButton: false,
                        showCancelButton: false,
                        icon: 'info',
                        title: 'تم الحفظ بنجاح ',
                        timer: 1500
                    });
                }, error => {
                    Swal.fire({
                        showConfirmButton: false,
                        showCancelButton: false,
                        icon: 'error',
                        title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                        timer: 2500
                    });
                });
            }, error => {
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'error',
                    title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                    timer: 2500
                });
            });
        }

        if (type === 'tva') {
            const settings = this.applySettingTVA.getRawValue();
            this.settingService.updateTva(this.tvaTransaction.id, {percentage: settings.tvaTransaction}).subscribe(tvaTransaction => {
                this.settingService.updateTva(this.tvaTransport.id, {percentage: settings.tvaTransport}).subscribe(tva => {
                    Swal.fire({
                        showConfirmButton: false,
                        showCancelButton: false,
                        icon: 'info',
                        title: 'تم الحفظ بنجاح ',
                        timer: 1500
                    });
                }, error => {
                    Swal.fire({
                        showConfirmButton: false,
                        showCancelButton: false,
                        icon: 'error',
                        title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                        timer: 2500
                    });
                });
            }, error => {
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'error',
                    title: 'يجب أن تتراوح النسبة المئوية بين 0 و 99 ',
                    timer: 2500
                });
            });
        }
    }
}

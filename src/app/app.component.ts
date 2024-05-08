import { Component, Inject, LOCALE_ID, OnInit, Renderer2 } from "@angular/core";
import { ConfigService } from "../@vex/services/config.service";
import { Settings } from "luxon";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { NavigationService } from "../@vex/services/navigation.service";
import icLayers from "@iconify/icons-ic/twotone-layers";
import { LayoutService } from "../@vex/services/layout.service";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SplashScreenService } from "../@vex/services/splash-screen.service";
import { Style, StyleService } from "../@vex/services/style.service";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "vex";
  role: string;
  managementPack: any;

  ngOnInit() {
    this.navigationService.items = [
      {
        type: "link",
        label: "لوحة التحكم الرئيسية",
        route: "/",
        icon: icLayers,
        routerLinkActiveOptions: { exact: true },
      },
    ];
    if (this.role == "ADMIN") {
      if (this.managementPack) {
        for (const permission of this.managementPack.permissions) {
          if (permission.name == "MANAGE-CONTENT")
            this.navigationService.items.push({
              type: "dropdown",
              label: "إدارة المحتوى",
              icon: icLayers,
              children: [
                {
                  type: "link",
                  label: "إدارة الأقسام",
                  route: "/content-management/department/list",
                },
                {
                  type: "link",
                  label: "إدارة الفئات الرئيسية",
                  route: "/content-management/parent-category/list",
                },
                {
                  type: "link",
                  label: "إدارة الفئات الفرعية",
                  route: "/content-management/child-category/list",
                },
                {
                  type: "link",
                  label: "إدارة الخصائص",
                  route: "/content-management/attribute/list",
                },
                {
                  type: "link",
                  label: "إدارة مواضيع الاختلاف",
                  route: "/content-management/variation-theme/list",
                },
              ],
            });

          if (permission.name == "MANAGE-SELLER")
            this.navigationService.items.push({
              type: "link",
              label: "ادارة البائعين ",
              route: "/user-management/vendor/list",
              icon: icLayers,
              routerLinkActiveOptions: { exact: true },
            });

          if (permission.name == "MANAGE-CUSTOMER")
            this.navigationService.items.push({
              type: "link",
              label: "إدارة العملاء",
              route: "/user-management/customer/list",
              icon: icLayers,
              routerLinkActiveOptions: { exact: true },
            });

          if (permission.name == "MANAGE-ORDER")
            this.navigationService.items.push({
              type: "dropdown",
              label: "ادارة العمليات التجارية",
              icon: icLayers,
              children: [
                {
                  type: "link",
                  label: "إدارة عمليات البيع",
                  route: "/content-management/department/list",
                },
                {
                  type: "link",
                  label: "إدارة الأموال",
                  route: "/content-management/parent-category/list",
                },
              ],
            });


          if (permission.name == "MANAGE-PAYOUT")
            this.navigationService.items.push({
              label: "إدارة المدفوعات ",
              type: "link",
              route: "/payout-management/list",
              icon: icLayers,
              routerLinkActiveOptions: { exact: true },
            });

          if (permission.name == "MANAGE-REPORT")
            this.navigationService.items.push({
              label: "إدارة التقارير ",
              type: "link",
              route: "/report-management/list",
              icon: icLayers,
              routerLinkActiveOptions: { exact: true },
            });

          if (permission.name == "VIEW-PLATFORM-REVENUE")
            this.navigationService.items.push({
              label: "مكاسب المنصة",
              type: "link",
              route: "/platform-gain/list",
              icon: icLayers,
              routerLinkActiveOptions: { exact: true },
            });

          if (permission.name == "MANAGE-PRODUCT")
            this.navigationService.items.push({
              type: "dropdown",
              label: "إدارة المنتجات",
              icon: icLayers,
              children: [
                {
                  type: "link",
                  label: "المنتجات المعلقة",
                  route: "/product-management/list/all",
                },
                {
                  type: "link",
                  label: "جميع المنتجات",
                  route: "/product-management/list/all",
                },
              ],
            });
        }
      }
    }

    if (this.role == "SUPER_ADMIN") {
      this.navigationService.items = [
        {
          type: "link",
          label: "لوحة التحكم الرئيسية",
          route: "/",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },

        {
          type: "dropdown",
          label: "إدارة المشرفين ",
          icon: icLayers,
          children: [
            {
              type: "link",
              label: "اضافة مشرف جديد",
              route: "/admin-management/add",
            },
            {
              type: "link",
              label: "قائمة ",
              route: "/admin-management/list",
            },
          ],
        },
        {
          type: "dropdown",
          label: "إدارة الصلاحيات ",
          icon: icLayers,
          children: [
            {
              type: "link",
              label: "اضافة إذن جديد",
              route: "/permissions-group-management/add",
            },
            {
              type: "link",
              label: " قائمة الصلاحيات ",
              route: "/permissions-group-management/list",
            },
          ],
        },

        {
          type: "dropdown",
          label: "إدارة المحتوى",
          icon: icLayers,
          children: [
            {
              type: "link",
              label: "إدارة الأقسام",
              route: "/content-management/department/list",
            },
            {
              type: "link",
              label: "إدارة الفئات الرئيسية",
              route: "/content-management/parent-category/list",
            },
            {
              type: "link",
              label: "إدارة الفئات الفرعية",
              route: "/content-management/child-category/list",
            },
            {
              type: "link",
              label: "إدارة الخصائص",
              route: "/content-management/attribute/list",
            },
            {
              type: "link",
              label: "إدارة مواضيع الاختلاف",
              route: "/content-management/variation-theme/list",
            },
          ],
        },

      
        {
          type: "dropdown",
          label: "إدارة المستخدمين",
          icon: icLayers,
          children: [
            {
              type: "link",
              label: "ادارة البائعين ",
              route: "/user-management/vendor/list",
            },
            {
              type: "link",
              label: "إدارة العملاء",
              route: "/user-management/customer/list",
            },
          ],
        },

        {
          type: "link",
          label: "إدارة المنتجات",
          route: "/product-management/list/all",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },

        {
          label: "إدارة التقارير ",
          type: "link",
          route: "/report-management/list",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: "إدارة المدفوعات ",
          type: "link",
          route: "/payout-management/list",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: "إدارة الطلبات ",
          type: "link",
          route: "/order-management/list",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },

        {
          label: "مكاسب المنصة",
          type: "link",
          route: "/platform-gain/list",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },

        {
          type: "link",
          label: "إعدادات عامة ",
          route: "/setting-management",
          icon: icLayers,
          routerLinkActiveOptions: { exact: true },
        },
      ];
    }
  }

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private authService: AuthService
  ) {
    if (this.authService.getRole()) this.role = this.authService.getRole();
    if (this.authService.getAdminManagementPack())
      this.managementPack = this.authService.getAdminManagementPack();
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap
      .pipe(
        filter((queryParamMap) => queryParamMap.has("rtl")),
        map((queryParamMap) => coerceBooleanProperty(queryParamMap.get("rtl")))
      )
      .subscribe((isRtl) => {
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );

    /**
     * Add your own routes here
     */
  }
}

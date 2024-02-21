# Backoffice integration
Displays hover buttons to direct user to Studio or the Merchant center

## Requirements
Add to your frontend .env file
```
NEXT_PUBLIC_INTEGRATION_FRONTASTIC_CUSTOMER=<frontastic customer name>
NEXT_PUBLIC_INTEGRATION_FRONTASTIC_PROJECT=<frontastic project>
NEXT_PUBLIC_INTEGRATION_MC_REGION=<us-central1.gcp>
NEXT_PUBLIC_INTEGRATION_MC_PROJECT=<project-key>
```

## How to use
In order to use this functionality, this library is divided into two sections: `extensions` and `frontend`

### Add dependency
navigate to the `backend` and `frontend` directories and add the dependency
```
yarn add ct-backoffice-integration
```

### Extensions
We expose only one funnction from this section `injectPageTypeIntoDynamicPage`

#### injectPageTypeIntoDynamicPage
is use to inject the type of Dynamic Page into `dataSourcePayload` part of the dynamic page.
Refactor `backend/index.ts` according to the below snippet

```diff
+import { injectPageTypeIntoDynamicPage } from 'ct-backoffice-integration/dist/extensions';
 
 const extensionsToMerge = [
   contentfulExtensions,
@@ -51,8 +52,8 @@ const mergeDynamicPageHandlers = (extensions: Array<ExtensionRegistry>): Dynamic
       if (extension['dynamic-page-handler']) {
         const result: DynamicPageHandlerResponse = await extension['dynamic-page-handler'](request, dynamicPageContext);
 
-        if (result !== null) {
-          return result;
+        if (result) {
+          return injectPageTypeIntoDynamicPage(result);
         }
       }
     }

```

### Frontend
There are a couple of places that you have to integrate backoffice-integration into the frontend project

1. ***Frontastic renderer***: wrap or replace the top wrapper in renderer with `FrontendIntegrationProvider`
    ```diff
    file: packages/poc/frontend/frontastic/renderer/index.tsx
    + <frontend.FrontendIntegrationProvider pageData={pageData} isDisplayed={true}>
    <div className="flex min-h-screen flex-col items-stretch justify-start">
        {sections.filter(Boolean).map((section) => (
            <Grid
            key={section.sectionId}
    @@ -61,7 +63,7 @@ const Renderer = ({
            ))}
            </Grid>
        ))}
        </div>
    </frontend.FrontendIntegrationProvider>
    ```
1. ***Tastic wrapper***: Replace the parent `div` that wraps `<Tastic>` component with `FrontendTasticWrapper`
2. file: packages/poc/frontend/frontastic/renderer/components/tastic-wrapper/index.tsx
    ```diff
    - <div className={`${highlight(isHighlighted)} ${deviceVisibility(data.configuration)}`}>
    + <backofficeIntegration.FrontendTasticWrapper
    +    className={`${highlight(isHighlighted)} ${deviceVisibility(data.configuration)}`}
    +    data={{
    +      ...data,
    +      configuration: resolvedTasticData,
    +    }}
    +  >
        <Tastic data={resolvedTasticData} params={params} searchParams={searchParams} categories={categories} />
    + </backofficeIntegration.FrontendTasticWrapper>

    ```
    Wrap everything with `MerchantCenterIntegrationProvider`
     ```diff
     file: packages/poc/frontend/frontastic/renderer/components/tastic-wrapper/index.tsx
    - <div className={`${highlight(isHighlighted)} ${deviceVisibility(data.configuration)}`}>
    + <backofficeIntegration.MerchantCenterIntegrationProvider>
    + <backofficeIntegration.FrontendTasticWrapper
    +    className={`${highlight(isHighlighted)} ${deviceVisibility(data.configuration)}`}
    +    data={{
    +      ...data,
    +      configuration: resolvedTasticData,
    +    }}
    +  >
        <Tastic data={resolvedTasticData} params={params} searchParams={searchParams} categories={categories} />
    + </backofficeIntegration.FrontendTasticWrapper>
    + </backofficeIntegration.MerchantCenterIntegrationProvider>

    ```
1. ***MC Product integration***: Wrap the component where it's rendering product(s) with `MerchantCenterProductWrapper`and pass the `product` prop into the component.

    Note: `product` has to have `productId` property.

    examples:

    1.***ProductTile***
   ```diff
   file: packages/poc/frontend/components/commercetools-ui/organisms/product/product-tile/index.tsx
   -     <div onClick={onClick} ref={ref}>
   ...
   - </div>
   +     <frontend.MerchantCenterProductWrapper as="div" product={product} onClick={onClick} ref={ref}>
   ...
   +     </frontend.MerchantCenterProductWrapper>
   ```

    1.***ProductDetails***
   ```diff
   file: packages/poc/frontend/frontastic/tastics/products/details/index.tsx
   + <frontend.MerchantCenterProductWrapper product={data?.data?.dataSource.product}>
   <ProductDetailsAdapter
      product={data?.data?.dataSource.product}
      attributesToDisplay={
        (data.attributesToDisplay?.length && data.attributesToDisplay?.map((item: any) => item.key)) || [
          'color',
          'size',
        ]
      }
    />
   + </frontend.MerchantCenterProductWrapper>
   ```


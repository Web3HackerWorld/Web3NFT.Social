# BsForm

* cancelText?: string
* submitText?: string
* doCancel?: Function
* doSubmit?: string

## BsFormSection

* title
* desc
* slot
  * #head: if the slot exist, will ignore the title and desc attribute

## BsFormItem

* for
* label
* slot
  * #default

## BsFormItemInput

* for
* label
* ph: placeholder
* modelValue

## Example

### Simple Example

```vue
<BsForm :do-submit="doSubmit">
  <BsFormSection title="Create a new live stream">
    <BsFormItemInput v-model="title" for="title"  />
    <BsFormItemInput v-model="content" for="content" />
    <BsFormItemInput v-model="reward" for="reward" />
  </BsFormSection>
</BsForm>
```

### Full Example

```vue
<BsForm :do-submit="doSubmit">
  <BsFormSection title="Retweet to get $BST reward" :desc="retweetLinkSource">
    <BsFormItemInput v-model="retweetLink" for="retweetLink" label="Retweet Link" ph="https://twitter.com/.../status/...." />
    <BsFormItemInput v-model="rewardAddress" for="rewardAddress" label="Reward Address" ph="0x1234....6789" />
  </BsFormSection>
</BsForm>
```

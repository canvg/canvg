---
id: "ViewPort"
title: "Class: ViewPort"
sidebar_label: "ViewPort"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### DEFAULT\_VIEWPORT\_WIDTH

▪ `Static` **DEFAULT\_VIEWPORT\_WIDTH**: `number` = `800`

#### Defined in

[src/ViewPort.ts:10](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L10)

___

### DEFAULT\_VIEWPORT\_HEIGHT

▪ `Static` **DEFAULT\_VIEWPORT\_HEIGHT**: `number` = `600`

#### Defined in

[src/ViewPort.ts:11](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L11)

___

### viewPorts

• **viewPorts**: [`IViewPortSize`](../interfaces/IViewPortSize.md)[] = `[]`

#### Defined in

[src/ViewPort.ts:13](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L13)

## Constructors

### constructor

• **new ViewPort**()

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[src/ViewPort.ts:15](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L15)

___

### setCurrent

▸ **setCurrent**(`width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[src/ViewPort.ts:19](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L19)

___

### removeCurrent

▸ **removeCurrent**(): `void`

#### Returns

`void`

#### Defined in

[src/ViewPort.ts:26](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L26)

___

### getRoot

▸ **getRoot**(): [`IViewPortSize`](../interfaces/IViewPortSize.md)

#### Returns

[`IViewPortSize`](../interfaces/IViewPortSize.md)

#### Defined in

[src/ViewPort.ts:30](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L30)

___

### getCurrent

▸ **getCurrent**(): [`IViewPortSize`](../interfaces/IViewPortSize.md)

#### Returns

[`IViewPortSize`](../interfaces/IViewPortSize.md)

#### Defined in

[src/ViewPort.ts:40](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L40)

___

### computeSize

▸ **computeSize**(`d?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `d?` | `number` \| [`Axis`](../#axis) |

#### Returns

`number`

#### Defined in

[src/ViewPort.ts:59](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L59)

## Accessors

### width

• `get` **width**(): `number`

#### Returns

`number`

#### Defined in

[src/ViewPort.ts:51](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L51)

___

### height

• `get` **height**(): `number`

#### Returns

`number`

#### Defined in

[src/ViewPort.ts:55](https://github.com/canvg/canvg/blob/5c58ee8/src/ViewPort.ts#L55)

# 移动端适配动态REM方案

> 注意：这只适用于手机！
>
> 使用场景：UI给前端一张宽度固定的设计图，要求适配不同屏幕尺寸的手机时采用的等比缩放方案。
>
> 1rem 等于 1倍 html 的 font-size

## CSS 代码

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
  <script>
    const designWidth = 750 // UI 给的设计稿宽度
    const setRootFontSize = () => {
      //设置 html 标签的 fontSize
      document.documentElement.style.fontSize = (100*screen.width/designWidth) + 'px'
    }
    window.onorientationchange = setRootFontSize
    setRootFontSize()
  </script>

  <style>
    div {
      width: 3.75rem; /* 需要随屏幕等比缩放的地方就使用 rem 单位，如：32px -> 0.32rem */
      border: 1px solid red; /* 不需要缩放的地方用 px */
    }
  </style>
</head>
<body>
  <div>内容</div>
</body>
</html>
```

## 使用 SASS：px 自动变 rem

```scss
@function px($px){
  @return $px/$designWidth*10 + rem;
}
$designWidth: 750;

.div {
  width: px(100);
  height: px(200);
  margin: px(40) px(20);
  border: 1px solid red;
}
```

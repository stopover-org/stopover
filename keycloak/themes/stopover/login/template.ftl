<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <title><#nested "title"></title>

    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
    <link href="${url.resourcesPath}/img/favicon.png" rel="icon"/>

    <script>
        function togglePassword(id1 = 'password', id2 = 'v1') {
            var x = document.getElementById(id1);
            var v = document.getElementById(id2);
            if (x.type === "password") {
                x.type = "text";
                v.src = "${url.resourcesPath}/img/eye.png";
            } else {
                x.type = "password";
                v.src = "${url.resourcesPath}/img/eye-off.png";
            }
        }
    </script>
</head>

<body>
    <#nested "header">
    <div class="form-content">
        <div class="box">
            <#if displayMessage && message?has_content>
                <div class="alert alert-${message.type}">
                    <#if message.type == 'success'>
                        <span class="${properties.kcFeedbackSuccessIcon!}"></span>
                    </#if>
                    <#if message.type == 'warning'>
                        <span class="${properties.kcFeedbackWarningIcon!}"></span>
                    </#if>
                    <#if message.type == 'error'>
                        <span class="${properties.kcFeedbackErrorIcon!}"></span>
                    </#if>
                    <#if message.type == 'info'>
                        <span class="${properties.kcFeedbackInfoIcon!}"></span>
                    </#if>
                    <span class="message-text">${message.summary?no_esc}</span>
                </div>
            </#if>
            <div>
                <img class="logo" src="${url.resourcesPath}/img/logo.png" alt="My Auth">
            </div>
            <#nested "form">
        </div>
    </div>
</body>

</html>
</#macro>

<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "form">
        <div class="box-container">
            <#if realm.password>
                <main>
                    <header>
                        <h1>
                            ${msg("emailForgotTitle")}
                        </h1>
                    </header>
                    <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
                        <div class="${properties.kcFormGroupClass!}">

                            <div class="${properties.kcInputWrapperClass!}">
                                <input placeholder="${msg('username')}" type="text" id="username" name="username" class="${properties.kcInputClass!}" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>" dir="ltr"/>
                                <#if messagesPerField.existsError('username')>
                                    <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                    </span>
                                </#if>
                            </div>
                        </div>
                        <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">

                        <div id="kc-registration-container" class="pf-v5-c-login__main-footer-band">
                            <div id="kc-registration" class="pf-v5-c-login__main-footer-band-item">
                                <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                                    <div>
                                        <a href="${url.registrationUrl}">${msg("doRegister")}</a>
                                    </div>
                                </#if>
                               <div>
                                    <a href="${url.loginUrl}">${msg("doLogIn")}</a>
                               </div>
                            </div>
                        </div>

                        <div class="${properties.kcFormGroupClass!}">
                            <input class="${properties.kcButtonClassCustom!} ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}"/>
                        </div>
                    </form>
                </main>
            </#if>
        </div>
    <#elseif section = "info" >
        <#if realm.duplicateEmailsAllowed>
            ${msg("emailInstructionUsername")}
        <#else>
            ${msg("emailInstruction")}
        </#if>
    </#if>
</@layout.registrationLayout>

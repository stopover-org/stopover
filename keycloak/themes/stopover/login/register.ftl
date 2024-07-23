<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section == "form">
        <div class="box-container">
            <main>
                <header>
                    <h1>
                        ${msg("registerTitle")}
                    </h1>
                </header>
                <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
                    <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email', properties.kcFormGroupErrorClass!)}">
                        <input placeholder="${msg('email')}" type="email" id="email" class="${properties.kcInputClass!}" name="email" value="${(register.formData.email!'')}" autocomplete="email" />
                    </div>

                    <#if !realm.registrationEmailAsUsername>
                        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username', properties.kcFormGroupErrorClass!)}">
                            <input placeholder="${msg('username')}" type="text" id="username" class="${properties.kcInputClass!}" name="username" value="${(register.formData.username!'')}" autocomplete="username"/>
                        </div>
                    </#if>

                    <#if passwordRequired>
                        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password', properties.kcFormGroupErrorClass!)}">
                            <div class="${properties.kcInputWrapperClass!}">
                            <div>
                                <label class="visibility" onclick="togglePassword('password1', 'v1')">
                                    <img id="v1" src="${url.resourcesPath}/img/eye-off.png">
                                </label>
                            </div>
                            <input placeholder="${msg('password')}" type="password" id="password1" class="${properties.kcInputClass!}" name="password" />
                            </div>
                        </div>
                    </#if>

                    <#if recaptchaRequired??>
                        <div class="form-group">
                            <div class="${properties.kcInputWrapperClass!}">
                                <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                            </div>
                        </div>
                    </#if>

                    <div id="kc-registration-container" class="pf-v5-c-login__main-footer-band">
                        <div id="kc-registration" class="pf-v5-c-login__main-footer-band-item">
                            <div>
                                <a href="${url.loginUrl}">${msg("doLogIn")}</a>
                            </div>
                            <#if realm.resetPasswordAllowed>
                                <div>
                                    <a href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                                </div>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <input id="RegisterButton" class="${properties.kcButtonClassCustom!} ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}" />
                    </div>
                </form>
            </main>
        </div>
    </#if>
</@layout.registrationLayout>

<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
    <#if section == "form">
        <div class="box-container">
            <#if realm.password>
                <main>
                    <header>
                        <h1>
                            ${msg("logInTitle")}
                        </h1>
                    </header>
                    <form id="kc-form-login" class="${properties.kcFormClass!}" onsubmit="return true;" action="${url.loginAction}" method="post">
                        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email', properties.kcFormGroupErrorClass!)}">
                            <input id="email" class="${properties.kcInputClass!}" placeholder="${msg("email")}" type="text" name="email" tabindex="1">
                        </div>

                        <div>
                            <label class="visibility" id="v" onclick="togglePassword()">
                                <img id="vi" src="${url.resourcesPath}/img/eye-off.png">
                            </label>
                        </div>

                        <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password', properties.kcFormGroupErrorClass!)}">
                            <input id="password" class="${properties.kcInputClass!}" placeholder="${msg("password")}" type="password" name="password" tabindex="2">
                        </div>

                        <div id="kc-registration-container" class="pf-v5-c-login__main-footer-band">
                            <div id="kc-registration" class="pf-v5-c-login__main-footer-band-item">
                                <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                                    <div>
                                        <a tabindex="3" href="${url.registrationUrl}">${msg("doRegister")}</a>
                                    </div>
                                </#if>
                                <#if realm.resetPasswordAllowed>
                                    <div>
                                        <a tabindex="4" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                                    </div>
                                </#if>
                            </div>
                        </div>

                        <input class="submit" class="${properties.kcButtonClassCustom!} ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" value="${msg("doLogIn")}" tabindex="5">
                    </form>
                </main>
            </#if>
            <#if social.providers??>
                <div class="alternate-wrapper">
                    <span spacing="16" class="separator"></span>
                    <div class="login-alternate-spacer"></div>
                    <span data-cy="text" font-size="16px" font-weight="400" class="login-alternate">or</span>
                    <div class="login-alternate-spacer"></div>
                    <span spacing="16" class="separator"></span>
                </div>
                <!--<p class="para">${msg("socialLoginAlternate")}</p>-->
                <div id="social-providers">
                    <#list social.providers as p>
                        <input class="social-link-style" type="button" onclick="location.href='${p.loginUrl}';" value="${p.displayName}"/>
                    </#list>
                </div>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>

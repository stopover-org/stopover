<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="box-container">
            <div class="main">
                <header>
                    <h1>
                        ${msg("emailVerifyTitle")}
                    </h1>
                </header>
                <div>
                    ${msg("emailVerifyInstruction1", user.email)}
                </div>
            </main>
        </div>
    <#elseif section = "info">
        <p class="instruction">
            ${msg("emailVerifyInstruction2")}
            <br/>
            <a href="${url.loginAction}">${msg("doClickHere")}</a> ${msg("emailVerifyInstruction3")}
        </p>
    </#if>
</@layout.registrationLayout>

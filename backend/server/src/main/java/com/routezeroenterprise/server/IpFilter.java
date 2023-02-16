package com.routezeroenterprise.server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

//@Component
public class IpFilter implements Filter, HandlerInterceptor {

    private final List<String> allowedIpAddresses;

    public IpFilter(@Value("${allowed.ip.addresses}") String allowedIpAddresses) {
        this.allowedIpAddresses = Arrays.asList(allowedIpAddresses.split(","));
        System.out.println("===> Allowed IPs: " + this.allowedIpAddresses);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String clientIpAddress = httpServletRequest.getRemoteAddr();
        System.out.println("===> " + clientIpAddress + " " + request.getLocalAddr());

        if (allowedIpAddresses.contains(clientIpAddress)) {
            // Allowed IP response
            chain.doFilter(request, response);
        } else {
            // Forbidden response
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
        }
    }
}

import {createIPX, handleRequest} from 'ipx'

export default defineEventHandler(async (event) => {
    const url = event.node.req.url?.replace('/api/_ipx/', '');
    if(!url) {
        event.node.res.statusCode = 404;
        event.node.res.end();
        return event;
    }

    const ipx = createIPX({
        dir: '/var/www/dashboard/public', // absolute path to images dir
        domains: [], // allowed external domains (should match domains option in nuxt.config)
        alias: {}, // base alias
        sharp: {}, // sharp options
    })

    const ipxResponse = await handleRequest({url, headers: <Record<string, string>>event.node.req.headers}, ipx)

    event.node.res.statusCode = ipxResponse.statusCode;
    event.node.res.statusMessage = ipxResponse.statusMessage;
    for (const name in ipxResponse.headers) {
        event.node.res.setHeader(name, ipxResponse.headers[name]);
    }
    event.node.res.end(ipxResponse.body);

    return event;
});

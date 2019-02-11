"use-strict"

// External dependencies.
const kinveyFlexSDK = require("kinvey-flex-sdk");
const virgilCrypto = require("virgil-crypto");

// Service version.
const { version: serviceVersion } = require("./package.json");

// Initialize Kinvey Flex.
kinveyFlexSDK.service((err, flex) => {
    if (err) {
        console.log("Error while initializing Flex!");
        return;
    }
    // Register Flex Function.
    flex.functions.register("crypto", (context, complete, modules) => {
        try {
            const mVirgilCrypto = new virgilCrypto.VirgilCrypto();
            const mKeyPair = mVirgilCrypto.generateKeys();
            flex.logger.info("Generated Key Pair: " + JSON.stringify(mKeyPair));
            return complete().setBody({
                success: "true",
                debug: "Success. Please check logs.",
                serviceVersion: serviceVersion
            }).ok().next();
        } catch (e) {
            flex.logger.error("Error: " + JSON.stringify(e));
            return complete().setBody({
                success: false,
                debug: "Error occured. Please check logs.",
                serviceVersion: serviceVersion
            }).runtimeError().done();
        }
    });
});
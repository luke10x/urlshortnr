import { shallowMount } from "@vue/test-utils";
import Shortnr from "@/components/Shortnr.vue";
import flushPromises from "flush-promises";

import { fetchWrapper } from "@/components/boundaries";
jest.mock("@/components/boundaries");

describe("Shortnr.vue", () => {
  // const fetchMock = <jest.Mock<typeof fetchWrapper>>fetchWrapper;
  const fetchMock = fetchWrapper as jest.Mock;

  beforeEach(() => jest.clearAllMocks());
  beforeEach(async () => await flushPromises());

  it("renders form with input and button", () => {
    const inputPlaceholder = "Enter link here";
    const buttonTitle = "Shorten URL";

    const wrapper = shallowMount(Shortnr);
    expect(wrapper.find("input").html()).toContain(inputPlaceholder);
    expect(wrapper.text()).toContain(buttonTitle);
  });

  describe("when there are some previously created links", () => {
    it("lists the links", async () => {
      fetchMock.mockResolvedValue({
        json: () =>
          Promise.resolve([
            {
              url: "https://www.youtube.com/watch?v=9JrQP90c45E",
              code: "https://pbid.io/kdsm322m"
            },
            {
              url: "https://luke10x.dev",
              code: "https://pbid.io/kdsm3220"
            }
          ])
      });

      const wrapper = shallowMount(Shortnr);
      await flushPromises();

      expect(wrapper.find("ul li:nth-child(1)").text()).toContain(
        "pbid.io/kdsm322m"
      );
      expect(wrapper.find("ul li:nth-child(2)").text()).toContain(
        "luke10x.dev"
      );
    });
  });

  describe("when data is loaded", () => {
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve([])
    });

    const wrapper = shallowMount(Shortnr);

    const button = wrapper.find("button");

    describe("when empty url is passed", () => {
      it("shows Error", async () => {
        wrapper.find("[data-url]").setValue("");
        button.trigger("click");
        await wrapper.vm.$nextTick();

        expect(wrapper.find(".error").text()).toContain("Link cannot be empty");
      });
    });

    describe("when some URL is passed", () => {
      it("posts and waits for result from the backend", async () => {
        fetchMock.mockResolvedValue({
          json: () =>
            Promise.resolve({
              url: "https://luke10x.dev",
              code: "https://pbid.io/kdsm3220"
            })
        });

        wrapper.find("[data-url]").setValue("https://luke10x.dev");
        button.trigger("click");

        expect(fetchMock).toHaveBeenLastCalledWith(
          "http://penguin.linux.test:9090/",
          expect.anything()
        );
        expect(fetchMock).toHaveBeenLastCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: "post"
          })
        );
      });
    });
  });

  describe("creating a new link", () => {
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve([])
    });
    const wrapper = shallowMount(Shortnr);
    const button = wrapper.find("button");

    describe("when URL stored sucessfully", () => {
      it("adds new item to the list", async () => {
        expect(wrapper.find("ul li").exists()).toBe(false);

        fetchMock.mockResolvedValue({
          status: 201,
          json: () =>
            Promise.resolve({
              url: "https://luke10x.dev",
              code: "https://pbid.io/kdsm3220"
            })
        });

        wrapper.find("[data-url]").setValue("https://luke10x.dev");
        button.trigger("click");
        await flushPromises();

        expect(wrapper.find("ul li").text()).toContain("luke10x.dev");
        expect(wrapper.find("ul li").text()).toContain("pbid.io/kdsm3220");
      });
    });
  });

  describe("errors while trying to create URLs", () => {
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve([])
    });
    const wrapper = shallowMount(Shortnr);
    const button = wrapper.find("button");

    describe("server is busy", () => {
      it("shows error", async () => {
        fetchMock.mockResolvedValue({
          status: 503
        });
        wrapper.find("[data-url]").setValue("https://luke10x.dev");
        button.trigger("click");
        await flushPromises();
        expect(wrapper.find("ul li").exists()).toBe(false);
        expect(wrapper.find(".error").text()).toContain(
          "Server is busy, try again later"
        );
      });
    });

    describe("server crashed", () => {
      it("shows error", async () => {
        fetchMock.mockResolvedValue({
          status: 500
        });
        wrapper.find("[data-url]").setValue("https://luke10x.dev");
        button.trigger("click");
        await flushPromises();
        expect(wrapper.find("ul li").exists()).toBe(false);
        expect(wrapper.find(".error").text()).toContain("Unexpected response");
      });
    });

    describe("Validation error", () => {
      it("shows error from the response body", async () => {
        fetchMock.mockResolvedValue({
          status: 400,
          json: () => Promise.resolve({ error: "The URL must be HTTPS" })
        });
        wrapper.find("[data-url]").setValue("http://luke10x.dev/");
        button.trigger("click");
        await flushPromises();
        expect(wrapper.find("ul li").exists()).toBe(false);
        expect(wrapper.find(".error").text()).toContain(
          "The URL must be HTTPS"
        );
      });
    });

    describe("network error", () => {
      it("shows error", async () => {
        fetchMock.mockRejectedValue(new Error("net::ERR_CONNECTION_REFUSED"));
        wrapper.find("[data-url]").setValue("http://luke10x.dev/");
        button.trigger("click");
        await flushPromises();
        expect(wrapper.find("ul li").exists()).toBe(false);
        expect(wrapper.find(".error").text()).toContain("Network error");
      });
    });
  });

  describe("error when trying to fetch the list", () => {
    fetchMock.mockRejectedValue(new Error("net::ERR_CONNECTION_REFUSED"));
    const wrapper = shallowMount(Shortnr);
    it("shows error", () => {
      expect(wrapper.find("ul li").exists()).toBe(false);
      expect(wrapper.find(".error").text()).toContain("Network error");
    });
  });
});

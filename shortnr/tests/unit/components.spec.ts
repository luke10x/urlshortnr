import { shallowMount } from "@vue/test-utils";
import Shortnr from "@/components/Shortnr.vue";

import { fetchWrapper } from '@/components/boundaries';
jest.mock('@/components/boundaries');

describe("Shortnr.vue", () => {
  // const fetchMock = <jest.Mock<typeof fetchWrapper>>fetchWrapper;
  const fetchMock = fetchWrapper as jest.Mock;

  fetchMock.mockResolvedValue({
    json: () => Promise.resolve([]),
  });
  // afterEach(fetchMock.restore)

  it("renders form with input and button", () => {

    const inputPlaceholder = "Enter link here";
    const buttonTitle = "Shorten URL";

    const wrapper = shallowMount(Shortnr);
    expect(wrapper.find('input').html()).toContain(inputPlaceholder);
    expect(wrapper.text()).toContain(buttonTitle);
  });
});

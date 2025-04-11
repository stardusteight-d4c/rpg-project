import { Fragment } from "react"
import { CompassRose } from "@/shared/components/ui/icons"
import { useCampaigns } from "@/shared/contexts"

export const Empty: React.FC<{ isActiveMap: boolean }> = ({ isActiveMap }) => {
  const { isMaster } = useCampaigns()
  if (isActiveMap) return

  return isMaster ? (
    <Fragment>
      <svg
        width="38"
        height="38"
        viewBox="-13 0 148 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[50px] top-4 rotate-[260deg] "
      >
        <path
          d="M0 2.65037C6.14938 -1.37392 12.2988 -0.103094 17.812 1.80315C25.4458 4.55662 32.8674 8.1573 39.6529 12.3934C70.3998 32.7267 88.8479 61.744 96.4816 97.539C98.39 106.647 99.0262 116.178 100.299 126.556C108.78 121.685 113.233 112.154 121.715 106.647C122.776 110.883 120.655 113.636 118.959 115.966C111.961 125.497 104.752 135.028 97.3299 144.348C93.725 148.796 90.9684 149.219 87.1515 145.407C79.0937 137.57 74.2167 128.039 72.7323 117.025C72.7323 116.601 73.3684 115.966 74.2166 114.907C83.3347 117.237 81.2142 128.886 89.06 133.122C92.4527 118.508 89.9082 104.529 86.0913 90.973C82.0624 76.7821 76.7612 63.2266 68.2793 51.1537C60.0095 39.2926 49.6191 29.7614 38.1686 20.8656C26.93 11.758 14.2072 6.03925 0 2.65037Z"
          fill="#9ca3af"
        />
      </svg>
      <span className="block w-[300px] text-center absolute text-gray-400 right-[70px] top-[60px]">
        The adventurers reaches the end of reality... because there are no
        active map yet. How about we fix this before they try explore the void?
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="empty-state-icon mx-auto col-span-1 !text-[#9ca3af] !fill-[#9ca3af] w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border shadow-md shadow-black/50 rounded-md aspect-square">
          <CompassRose />
        </div>
        <span className="text-gray-400 block mt-2 w-[400px] text-center">
          The adventurers took a step forward… and there is nothing. No ground,
          no road, not even a horizon.
        </span>
      </div>
    </Fragment>
  ) : (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="empty-state-icon mx-auto col-span-1 !text-[#9ca3af] !fill-[#9ca3af] w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border shadow-md shadow-black/50 rounded-md aspect-square">
        <CompassRose />
      </div>
      <span className="text-gray-400 block mt-2 w-[400px] text-center">
        We took a step forward… and there is nothing. No ground, no road, not
        even a horizon. Has the world ended, or did the Master just forget to
        create it?
      </span>
    </div>
  )
}

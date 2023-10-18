import React from 'react'
import { usePreferencesStore } from 'store/preferences'
import { TBlendMode } from 'store/preferences/types'
import { AiOutlineCheck as CheckIcon, AiFillDelete as RemoveIcon } from 'react-icons/ai'
import { Range } from 'components/Preferences/components/Range'
import { Dialog } from 'components/Preferences/components/Dialog'
import { IDialogActions } from 'components/Preferences/components/Dialog/types'
import { Container } from './styles'

export const GifModule = () => {
  const preferencesStore = usePreferencesStore()
  const removeGifDialog = React.useRef<IDialogActions>(null)

  const [gifUrl, setGifUrl] = React.useState('')

  const handleRemoveGif = () => {
    preferencesStore.removeGif()
  }

  const BlendSelect = () => (
    <div className="blendSelect">
      <span>Blend mode</span>

      <select
        defaultValue={preferencesStore.current.gif.blend}
        onChange={event =>
          preferencesStore.updateGif({ blend: event.target.value as TBlendMode })
        }
      >
        <option value="normal">normal</option>
        <option value="multiply">multiply</option>
        <option value="screen">screen</option>
        <option value="overlay">overlay</option>
        <option value="darken">darken</option>
        <option value="lighten">lighten</option>
        <option value="color-dodge">color-dodge</option>
        <option value="color-burn">color-burn</option>
        <option value="hard-light">hard-light</option>
        <option value="soft-light">soft-light</option>
        <option value="difference">difference</option>
        <option value="exclusion">exclusion</option>
        <option value="hue">hue</option>
        <option value="saturation">saturation</option>
        <option value="color">color</option>
        <option value="luminosity">luminosity</option>
      </select>
    </div>
  )

  return (
    <Container className={`${preferencesStore.current.gif.url ? '--is-gifSet' : ''}`}>
      <div className="preview">
        {preferencesStore.current.gif.url && (
          <RemoveIcon
            title={'remove gif'}
            onClick={() => removeGifDialog.current?.open()}
          />
        )}

        <video
          src={preferencesStore.current.gif.url}
          autoPlay
          muted
          loop
          controls={false}
          width={120}
        />

        <BlendSelect />

        <Range
          label="Size"
          value={preferencesStore.current.gif.size}
          onChange={value =>
            preferencesStore.updateGif({
              size: value,
            })
          }
        />

        <Range
          label="Blur"
          value={preferencesStore.current.gif.blur}
          onChange={value =>
            preferencesStore.updateGif({
              blur: value,
            })
          }
        />

        <Range
          label="Brightness"
          value={preferencesStore.current.gif.brightness}
          onChange={value =>
            preferencesStore.updateGif({
              brightness: value,
            })
          }
        />

        <Range
          label="Contrast"
          value={preferencesStore.current.gif.contrast}
          onChange={value =>
            preferencesStore.updateGif({
              contrast: value,
            })
          }
        />

        <Range
          label="Alpha"
          value={preferencesStore.current.gif.alpha}
          onChange={value =>
            preferencesStore.updateGif({
              alpha: value,
            })
          }
        />
      </div>

      <div className="search">
        <div className="searchInput">
          <input
            type="text"
            defaultValue={gifUrl}
            onChange={event => setGifUrl(event.target.value)}
            placeholder="Enter gif URL"
          />
          <CheckIcon onClick={() => preferencesStore.updateGif({ url: gifUrl })} />
        </div>
      </div>

      <Dialog
        ref={removeGifDialog}
        title={'Do you really want to do this?'}
        onConfirm={handleRemoveGif}
      />
    </Container>
  )
}
